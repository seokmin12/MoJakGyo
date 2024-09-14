import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function GoBackBtn({ onPress }) {
    return (
        <Pressable onPress={onPress}>
            <Icon name='chevron-left' size={31} color="#000" />
        </Pressable>
    )
}