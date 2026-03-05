type Props = {
  title: string
  text: string
}

export const HeroBox = ({ title, text }: Props) => {

  return (
    <div className="bg-gray-900/20 backdrop-blur-md p-12 rounded-2xl shadow-2xl/50">
      <h1 className="md:text-6xl font-bold text-white text-center text-shadow-md/20">
        {title}
      </h1>

      <p className="text-xl text-gray-100 text-center mt-4 text-shadow-sm/20">
        {text}
      </p>
    </div>
  )
}
