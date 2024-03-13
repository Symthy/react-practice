export function Header({ title }: { title: string }) {
  return (
    <header className="flex justify-center content-center bg-blue-300 p-1">
      <h1 className="text-5xl">{title}</h1>
    </header>
  );
}
