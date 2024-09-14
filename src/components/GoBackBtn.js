import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function GoBackBtn({ onPress, opacity, disabled }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ opacity: opacity }} disabled={disabled}>
            <Icon name='chevron-left' size={31} color="#000" />
        </TouchableOpacity>
    )
}