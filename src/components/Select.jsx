import { View, StyleSheet } from "react-native";

export default function({
    data,
    boxStyles,
    placeholder,
}) {
    const options = data?.map((item, index) => {
        return <option
            value={item.value}
            key={index}>{item.label}</option>
    });

    return <View style={[styles.container, boxStyles]}>
        <select
            defaultValue='DEFAULT'
            style={{
                paddingLeft: 20, paddingRight: 20, paddingTop: 12, paddingBottom: 12,
                borderRadius: 10,
                appearance: "none"
                }}>
            <option value="DEFAULT" disabled>{placeholder}</option>
            {options}
        </select>
        <View style={styles.after}>
            <img style={{width: "100%", height: "100%"}}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAMRJREFUSEvtkrkOwjAQRJOGm44/oaMCPhzoKPgVOsRZ8UZyJGtJfAi5s6VRsvbszu7YbVN4tYXrN1Ug6nC16C+LFmSvwRl8BiqN2N+AC7j3cUJ3sCVhBW7gBN6mwJhYnCW4Os6PRkhgBnsHpq67gycycWdzvk9wBI/cCcS3IiqktXdnweIipjxTiaigupbPytHeC2iq3s67aVIE7CSKo53nCvgi+h/03N5D6gRdnqzRCtrii+QK2AajcRWoFkUdiBKKv6IvukgeGXGzwcMAAAAASUVORK5CYII=" alt="dropDown" />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    after: {
        top: 6,
        right: 10,
        width: 20,
        height: 20,
        top: "50%",
        fontSize: "1rem",
        position: "absolute",
        transform: "translate(-50%, -50%)"
    }
})