#include <cassert>
#include "entities.h"

namespace thuai {
  Player::Player(int id) {
    assert(0 <= id && id < PLAYER_COUNT);
    m_id = id; m_egg_id = -1;
    m_endurance = 5.0;
    if (0 <= m_id && m_id < 4) {
      m_team = RED;
    } else if (4 <= m_id && m_id < 8) {
      m_team = YELLOW;
    } else {
      m_team = BLUE;
    }
  }

  void Player::set_position(Position new_pos) {
    this->m_pos = new_pos;
  }

  Position Player::position(void) const {
    return this->m_pos;
  }

  void Player::set_endurance(float new_endurance) {
    assert(-1e-7 <= new_endurance && new_endurance <= 5 + 1e-7);
    m_endurance = new_endurance;
  }
  float Player::endurance(void) const {
    return m_endurance;
  }

  void Player::set_egg(int new_egg_id) {
    assert(-1 <= new_egg_id && new_egg_id < EGG_COUNT);
    this->m_egg_id = new_egg_id;
  }

  int Player::egg(void) const {
    return this->m_egg_id;
  }

  int Player::id(void) const {
    return m_id;
  }

  Team Player::team(void) const {
    return m_team;
  }


  Egg::Egg(int id, int score): m_id(id), m_score(score) {}

  int Egg::id(void) const {
    return m_id;
  }
  int Egg::score(void) const {
    return m_score;
  }
  void Egg::set_position(Position new_pos) {
    m_pos = new_pos;
  }
  Position Egg::position(void) const {
    return m_pos;
  }
}