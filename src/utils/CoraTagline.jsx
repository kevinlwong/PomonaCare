export default function CoraTagline({ text, style = "" }) {
    return (
      <div className={`px-4 py-4 text-center ${style}`}>
        <p className=" text -base text-lg md:text-xl font-semibold text-purple-700 dark:text-purple-300">
          {text}
        </p>
      </div>
    );
  }
  