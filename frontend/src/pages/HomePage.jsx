import { Box, Container, HStack, VStack } from '@chakra-ui/react';
import Slideshow from '../components/Slideshow';
import Calendar from '../components/Calendar';

const HomePage = () => {
    return (
        <Container maxW={"container.xl"}>
            <VStack p={5}>
                <HStack>
                    <Box display="flex" gap={5} flexDirection={{ base: "column", lg: "row" }}>
                        <Box flex="1" minW={{ base: "sm", md: "4xl" }}>
                            <Slideshow />
                        </Box>
                        <Box borderRadius="md" bg="#1c1e1f" color="#a4a4a4">
                            <h2>Github</h2>
                            <p>Project list, links, or other widgets</p>
                        </Box>
                    </Box>
                </HStack>
                <HStack marginTop={5}>
                    <Box display="flex" gap={5} flexDirection={{ base: "column", lg: "row" }}>
                        <Box minW={{ base: "sm", md: "4xl" }}>
                            <Calendar />
                        </Box>
                        <Box borderRadius="md" bg="#1c1e1f" color="#a4a4a4">
                            <h2>Discord</h2>
                            <p>Project list, links, or other widgets</p>
                        </Box>
                    </Box>
                </HStack>
            </VStack>
        </Container>
    )
}

export default HomePage