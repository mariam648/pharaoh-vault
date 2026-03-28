function EmptyState({ title, description }) {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="max-w-md rounded-3xl border border-[#eadfcb] bg-white p-8 text-center shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
        <div className="mb-4 text-5xl">𓂀</div>
        <h2 className="text-2xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
}

export default EmptyState;