
import { useState } from "react";
import { Trophy, Users, Star, Crown, Target, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const CommunityChallenge = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("public");

  const publicChallenges = [
    {
      id: 1,
      title: "10K Steps Daily",
      description: "Walk 10,000 steps every day for 30 days",
      participants: 1247,
      daysLeft: 12,
      reward: "Gold Walker Badge",
      progress: 65,
      category: "fitness",
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Water Warrior",
      description: "Drink 8 glasses of water daily for 2 weeks",
      participants: 892,
      daysLeft: 5,
      reward: "Hydration Hero Badge",
      progress: 85,
      category: "wellness",
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Sleep Champion",
      description: "Get 8 hours of sleep for 21 nights",
      participants: 543,
      daysLeft: 18,
      reward: "Sleep Master Trophy",
      progress: 42,
      category: "sleep",
      difficulty: "Hard"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah M.", points: 2850, badge: "👑" },
    { rank: 2, name: "Mike R.", points: 2720, badge: "🥈" },
    { rank: 3, name: "Lisa K.", points: 2680, badge: "🥉" },
    { rank: 4, name: "You", points: 2450, badge: "🏅" },
    { rank: 5, name: "John D.", points: 2380, badge: "⭐" }
  ];

  const myGroups = [
    {
      id: 1,
      name: "Office Fitness Squad",
      members: 12,
      currentChallenge: "Lunch Break Walks",
      progress: 78
    },
    {
      id: 2,
      name: "Family Health Goals",
      members: 6,
      currentChallenge: "Cook Healthy Meals",
      progress: 56
    }
  ];

  const handleJoinChallenge = (challengeId: number) => {
    toast({
      title: "Challenge Joined!",
      description: "You've successfully joined the challenge. Good luck!",
    });
  };

  const handleCreateGroup = () => {
    toast({
      title: "Create Group",
      description: "Group creation feature coming soon!",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fitness": return "🏃‍♂️";
      case "wellness": return "💧";
      case "sleep": return "😴";
      default: return "🎯";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "Hard": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">Community Challenges</h2>
        <p className="text-muted-foreground">Join others on their health journey</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {[
          { id: "public", label: "Public Challenges", icon: Users },
          { id: "groups", label: "My Groups", icon: Target },
          { id: "leaderboard", label: "Leaderboard", icon: Trophy }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Public Challenges */}
      {activeTab === "public" && (
        <div className="space-y-4">
          {publicChallenges.map((challenge) => (
            <Card key={challenge.id} className="health-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getCategoryIcon(challenge.category)}</span>
                    <div>
                      <h3 className="font-bold text-lg">{challenge.title}</h3>
                      <p className="text-muted-foreground text-sm">{challenge.description}</p>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-health-blue">{challenge.participants}</p>
                    <p className="text-sm text-muted-foreground">Participants</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-health-orange">{challenge.daysLeft}</p>
                    <p className="text-sm text-muted-foreground">Days Left</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-health-purple">{challenge.progress}%</p>
                    <p className="text-sm text-muted-foreground">Your Progress</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-health-green">🏆</p>
                    <p className="text-sm text-muted-foreground">{challenge.reward}</p>
                  </div>
                </div>

                <Progress value={challenge.progress} className="mb-4" />

                <Button 
                  onClick={() => handleJoinChallenge(challenge.id)}
                  className="w-full bg-health-gradient hover:shadow-lg"
                >
                  Join Challenge
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* My Groups */}
      {activeTab === "groups" && (
        <div className="space-y-4">
          {myGroups.map((group) => (
            <Card key={group.id} className="health-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{group.name}</h3>
                    <p className="text-muted-foreground">{group.members} members</p>
                    <p className="text-sm text-health-blue">Current: {group.currentChallenge}</p>
                  </div>
                  <Badge variant="outline">{group.progress}% complete</Badge>
                </div>
                <Progress value={group.progress} className="mb-4" />
                <Button variant="outline" className="w-full">
                  View Group Details
                </Button>
              </CardContent>
            </Card>
          ))}
          
          <Card className="health-card">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-health-blue" />
              <h3 className="font-bold mb-2">Create Your Own Group</h3>
              <p className="text-muted-foreground mb-4">Invite friends and family to join your health journey</p>
              <Button onClick={handleCreateGroup} className="bg-health-gradient">
                Create Group
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === "leaderboard" && (
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Global Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg ${user.name === "You" ? "bg-health-gradient/20 border-2 border-health-green" : "bg-muted"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-health-blue text-white flex items-center justify-center font-bold">
                      {user.rank}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.points} points</p>
                    </div>
                  </div>
                  <span className="text-2xl">{user.badge}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunityChallenge;
