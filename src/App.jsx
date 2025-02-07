import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar } from "../components/ui/avatar";
import { LucideSun, LucideSearch, LucideHome } from "lucide-react";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center gap-2">
          <LucideSun className="text-black w-8 h-8" />
          <h1 className="text-xl font-semibold">Good Afternoon</h1>
        </div>
        <Avatar className="w-10 h-10 rounded-full" />
      </header>

      {/* Content */}
      <main className="flex-1 p-4 space-y-4">
        <Card className="h-40 bg-gray-200 animate-pulse">
          <CardContent>
            {/* Placeholder content */}
            <div className="space-y-2">
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              <div className="w-full h-3 bg-gray-300 rounded"></div>
              <div className="w-5/6 h-3 bg-gray-300 rounded"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-40 bg-gray-200 animate-pulse">
          <CardContent>
            {/* Placeholder content */}
            <div className="space-y-2">
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              <div className="w-full h-3 bg-gray-300 rounded"></div>
              <div className="w-5/6 h-3 bg-gray-300 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer Navigation */}
      <footer className="flex justify-between p-4 bg-white shadow-md">
        <Button variant="ghost" className="flex flex-col items-center">
          <LucideHome className="w-6 h-6" />
        </Button>
        <Button variant="ghost" className="flex flex-col items-center">
          <LucideSun className="w-6 h-6" />
        </Button>
        <Button variant="ghost" className="flex flex-col items-center">
          <LucideSearch className="w-6 h-6" />
        </Button>
      </footer>
    </div>
  );
};

export default App;
