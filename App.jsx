import { Canvas } from '@react-three/fiber'

export default function App() {
    return (
        <Canvas style={{ height: '100vh' }}>
            <ambientLight />
            <mesh>
                <boxGeometry />
                <meshStandardMaterial color="hotpink" />
            </mesh>
        </Canvas>
    )
}