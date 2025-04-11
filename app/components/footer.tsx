export default function Footer() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Pasar Ikang. All rights reserved.
        </p>
      </div>
    </div>
  );
}
