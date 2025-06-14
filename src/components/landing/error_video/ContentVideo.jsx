import React, { useState } from "react";
import { Clock, Eye, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ContentVideo({ tutorials, getDifficultyColor }) {
  const [playingId, setPlayingId] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials.map((tutorial) => (
        <motion.div
          key={tutorial.id}
          className="group lg:w-[80%] w-[100%] mx-auto cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: tutorial.id * 0.05 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative">
              {playingId === tutorial.id ? (
                <video
                  src={tutorial.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-[200px]"
                />
              ) : (
                <>
                  <div className="w-full h-[200px] bg-black flex items-center justify-center">
                    <Play
                      onClick={() => setPlayingId(tutorial.id)}
                      className="w-12 h-12 text-white opacity-80"
                    />
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="secondary"
                      className="bg-black bg-opacity-70 text-white hover:bg-black hover:bg-opacity-80"
                    >
                      {tutorial.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Badge
                      variant="secondary"
                      className="bg-black bg-opacity-70 text-white hover:bg-black hover:bg-opacity-80"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {tutorial.duration}
                    </Badge>
                  </div>
                </>
              )}
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {tutorial.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {tutorial.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="w-4 h-4 mr-1" />
                  {tutorial.views} lượt xem
                </div>
                <Badge
                  variant="outline"
                  className={getDifficultyColor(tutorial.difficulty)}
                >
                  {tutorial.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
