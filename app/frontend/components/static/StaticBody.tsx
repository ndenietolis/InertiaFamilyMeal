import { HeroBox } from '@/components/common/HeroBox'

export const StaticBody = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-20">
      <div className="mt-20">
        <HeroBox
          title="It's time for Family Meal!"
          text="A place to keep all your recipies, and share them with your friends"
        />
      </div>
      <div className="bg-gray-900/20 backdrop-blur-md p-12 text-white text-shadow-sm/20 rounded-2xl shadow-2xl/50">
        <ul className="list-none text-lg">
          <li className="mb-4">
            🫒&nbsp;&nbsp;Create recipes and store them in your personal book
          </li>
          <li className="mb-4">
            🍋&nbsp;&nbsp;Build a stash of custom ingredients 
          </li>
        </ul>
      </div>
    </div>
  )
}