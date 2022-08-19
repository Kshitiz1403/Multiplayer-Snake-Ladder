import { useContext } from 'react'
import { LayoutContext } from '../contexts/LayoutContext'
import stylesheet from './Player.module.css'

const Avatar = ({ playerImg }) => {

    const { squareDimension } = useContext(LayoutContext)

    // TO DO -> handle UI for same position enemy and me => center -> left & right
    return <div className={stylesheet.character} style={{ width: squareDimension, height: squareDimension }}>
        <img src={playerImg} alt='player-avatar' style={{ padding: 0.125 * squareDimension }} />
    </div>
}

export default Avatar;