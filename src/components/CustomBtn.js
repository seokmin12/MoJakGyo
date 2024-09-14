import { StyleSheet, TouchableOpacity, Text } from "react-native"

export default function CustomBtn({ label, onPress }) {
    return (
        <TouchableOpacity style={styles.Btn} onPress={() => console.log('ok')}>
            <Text style={styles.BtnFont}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Btn: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#0070F2',
    },

    BtnFont: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'BlackHanSans',
    }
})