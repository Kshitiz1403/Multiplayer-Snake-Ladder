import mummy_head from '../assets/player/mummy-head.svg'
import cleopatra from '../assets/player/cleopatra.svg'
import monkey_face from '../assets/player/monk-face.svg'
import goblin_head from '../assets/player/goblin-head.svg'
import female_vampire from '../assets/player/female-vampire.svg'

const getPlayerSVG = (playerNumber) => {
    switch (playerNumber) {
        case 1:
            return monkey_face
        case 2:
            return female_vampire
    }
}

export default getPlayerSVG