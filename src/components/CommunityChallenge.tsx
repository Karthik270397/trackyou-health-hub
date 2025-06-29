
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Calendar } from 'lucide-react';

const CommunityChallenge = () => {
  const challenges = [
    {
      name: "30-Day Step Challenge",
      participants: 145,
      description: "Walk 10,000 steps daily for 30 days",
      status: "Active",
      daysLeft: 12
    },
    {
      name: "Hydration Heroes",
      participants: 89,
      description: "Drink 8 glasses of water daily",
      status: "Active",
      daysLeft: 5
    },
    {
      name: "Sleep Well Challenge",
      participants: 67,
      description: "Get 8 hours of sleep for 7 days",
      status: "Completed",
      daysLeft: 0
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Join challenges with other users to stay motivated!
          </p>
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{challenge.name}</h3>
                  <Badge variant={challenge.status === 'Active' ? 'default' : 'secondary'}>
                    {challenge.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {challenge.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {challenge.participants} participants
                    </span>
                    {challenge.daysLeft > 0 && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {challenge.daysLeft} days left
                      </span>
                    )}
                  </div>
                  <Button size="sm" variant={challenge.status === 'Active' ? 'default' : 'outline'}>
                    {challenge.status === 'Active' ? 'Join' : 'View'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityChallenge;
