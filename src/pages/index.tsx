import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/home'
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center font-[family-name:var(--font-geist-sans)]" style={{ backgroundImage: "url('/macos-wallpaper.jpg')" }}>
      <div className="absolute inset-0 backdrop-blur-lg bg-black/30"></div>

      <main className="relative z-10 flex flex-col items-center p-8">
        <div className="mb-6">
          <Image
            src="/resources/preview.ico"
            alt="User Avatar"
            width={96}
            height={96}
            className="rounded-full border-2 border-white/50"
            priority
          />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 w-64">
          <p className="text-white text-lg font-medium mb-2">{username || "Nombre de Usuario"}</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
            required
          />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de Usuario"
            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
            required
          />

          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8 flex gap-6 text-sm text-gray-300">
          <button className="hover:text-white">Suspender</button>
          <button className="hover:text-white">Reiniciar</button>
          <button className="hover:text-white">Apagar</button>
        </div>
      </main>
    </div>
  );
}
