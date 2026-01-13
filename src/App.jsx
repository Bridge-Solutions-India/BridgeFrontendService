import { useState } from "react";
import Button from "@mui/material/Button";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-900 text-white">
            <h1 className="text-4xl font-bold">Vite + React</h1>

            {/* MUI Button */}
            <Button variant="contained">
                Hello MUI
            </Button>

            {/* Tailwind Button */}
            <button
                onClick={() => setCount(count + 1)}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
                Count is {count}
            </button>

            <p className="text-gray-400 text-sm">
                Edit <code className="bg-gray-800 px-1 rounded">src/App.jsx</code> and save to test HMR
            </p>
        </div>
    );
}

export default App;
