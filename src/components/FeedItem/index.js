import { View, Text, StyleSheet, Pressable, Dimensions, Platform } from 'react-native'
import { useRef, useState, useEffect } from 'react'
import { Video } from 'expo-av'

import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const { height: heightScreen } = Dimensions.get('screen')

export default function FeedItem({ data, currentVisibleItem }) {
    const video = useRef(null)
    const [status, setStatus] = useState({})

    useEffect(() => {
        if (currentVisibleItem?.id == data?.id) {
            video.current.playAsync()
        } else {
            video.current.pauseAsync()
        }
    }, [currentVisibleItem])

    function handlePlayer() {
        status.isPlaying ? video.current?.pauseAsync() : video.current?.playAsync()
    }

    return (
        <Pressable onPress={handlePlayer}>

            <View style={[styles.info, {
                bottom: 110,

            }]}>

                <Text style={styles.name}>
                    {data.name}
                </Text>
                <Text numberOfLines={2} style={styles.description}>
                    {data.description}
                </Text>

            </View>

            <View style={styles.actions}>
                <TouchableOpacity>
                    <Ionicons name='heart' size={35} color='#fff' />
                    <Text style={styles.actionText} >30.5k</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name='chatbubble-ellipses' size={35} color='#fff' />
                    <Text style={styles.actionText} >27.5k</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name='bookmark' size={35} color='#fff' />
                </TouchableOpacity>
            </View>

            <Video
                ref={video}
                style={{ width: '100%', height: heightScreen }}
                source={{ uri: data?.video }}
                resizeMode='cover'
                shouldPlay={false}
                isMuted={false}
                isLooping={true}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    info: {
        position: 'absolute',
        zIndex: 99,
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 4,
        textShadowColor: 'rgba(0,0,0,0.60)',
        textShadowOffset: { width: -1, height: 1.5 },
        textShadowRadius: 8,
    },
    description: {
        color: '#fff',
        textShadowColor: 'rgba(0,0,0,0.20)',
        textShadowOffset: { width: -1, height: 1.5 },
        textShadowRadius: 8,
        marginRight: 24,
    },
    actions: {
        position: 'absolute',
        zIndex: 99,
        right: 10,
        bottom: Platform.OS === 'android' ? 120 : 170,
        gap: 8
    },
    actionText: {
        textAlign: 'center',
        color: '#fff',
        textShadowColor: 'rgba(0,0,0,0.60)',
        textShadowOffset: { width: -1, height: 1.5 },
        textShadowRadius: 8,
    }
})