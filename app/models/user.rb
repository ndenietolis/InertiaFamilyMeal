class User < ApplicationRecord
  attr_writer :login

  # Associations########################################################
  has_many :user_recipes, :dependent => :destroy
  has_many :recipes, :through => :user_recipes
  has_many :user_ingredients, :dependent => :destroy
  has_many :ingredients, :through => :user_ingredients

  # Scopes #############################################################

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  # only allow letter, number, underscore and punctuation.
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def login
    @login || self.username || self.email
  end

  def self.by_username_or_email(value)
    return nil if value.blank?
    value.downcase!
    where(username: value )
    .or(where(email: value))
    .first
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if (login = conditions.delete(:login))
      where(conditions.to_h).where(["lower(userName) = :value OR lower(email) = :value", { :value => login.downcase}]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      where(conditions.to_h).dirst
    end
  end
end
