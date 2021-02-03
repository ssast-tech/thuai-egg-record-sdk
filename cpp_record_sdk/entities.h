#ifndef ENTITIES_H
#define ENTITIES_H

namespace thuai {

  const int EGG_COUNT = 15, PLAYER_COUNT = 12;

  struct Position {
    float x, y;
  };

  enum Team {
    RED, YELLOW, BLUE
  };

  class Player {
    int m_id, m_egg_id;
    Position m_pos;
    Team m_team;
    float m_endurance;
    
  public:
    Player(int id);
    void set_position(Position new_pos);
    Position position(void) const;
    void set_endurance(float new_endurance);
    float endurance(void) const;
    void set_egg(int new_egg_id);
    int egg(void) const;
    int id(void) const;
    Team team(void) const;
  };

  class Egg {
    int m_id, m_score;
    Position m_pos;

  public:
    Egg(int id, int score);
    int id(void) const;
    int score(void) const;
    void set_position(Position new_pos);
    Position position(void) const;
  };
}
#endif