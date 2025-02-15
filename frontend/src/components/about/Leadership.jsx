import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { GiPlasticDuck } from "react-icons/gi";

const Leadership = () => {
    return (
        <Flex flexDirection={{ base: "column", lg: "row" }}>
            {/* Advisor Section */}
            <Box flex="1" bg="#b8dadf" p={10} borderRadius="md">
                <Box borderTop="8px solid black" maxW="80px" mb={4}></Box>
                <Heading size="2xl" mb={8}>ADVISOR</Heading>
                <Box>
                    <GiPlasticDuck fontSize="250px" color='#fbbc05' style={{ transform: 'scaleX(-1)' }}/>
                </Box>
                <Heading as='h3' size='lg' mt={4}>Dr. John Doe</Heading>
                <Text fontSize="lg" mt={4} pl={8}>
                    Curabitur non purus eget orci consectetur facilisis. Ut feugiat, purus a sollicitudin facilisis, 
                    libero dui faucibus sapien, vitae varius ante erat vitae libero.
                </Text>
                <Text fontSize="lg" lineHeight="tall" pl={8} mt={4}>
                    Ut eget erat bibendum, tempor sapien a, posuere magna. In et viverra sapien. Donec ac tempor sapien. 
                    Aliquam feugiat ligula leo, vel dictum purus feugiat vitae.
                </Text>
                <Button size="lg" bg="blue.400" color="white" mt={6} _hover={{ bg: 'blue.500' }}>
                    Learn More
                </Button>
            </Box>

            {/* President Section */}
            <Box flex="1" bg="#c9e3e6" p={10} borderRadius="md">
                <Box borderTop="8px solid black" maxW="80px" mb={4}></Box>
                <Heading size="2xl" mb={8}>PRESIDENT</Heading>
                <Box>
                    <GiPlasticDuck fontSize="250px" color='#fbbc05' style={{ transform: 'scaleX(-1)' }}/>
                </Box>
                <Heading as='h3' size='lg' mt={4}>Jane Smith</Heading>
                <Text fontSize="lg" mt={4} pl={8}>
                    Maecenas vel placerat urna, nec auctor sem. Ut interdum tempor sapien sed convallis. 
                    Phasellus nec posuere lorem, in egestas lectus.
                </Text>
                <Text fontSize="lg" lineHeight="tall" pl={8} mt={4}>
                    Etiam pharetra vulputate justo, id consequat metus efficitur vel. Curabitur non purus eget 
                    orci consectetur facilisis.
                </Text>
                <Button size="lg" bg="blue.400" color="white" mt={6} _hover={{ bg: 'blue.500' }}>
                    Learn More
                </Button>
            </Box>
        </Flex>
    );
};

export default Leadership; 