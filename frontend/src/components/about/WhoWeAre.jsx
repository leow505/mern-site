import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { GiPlasticDuck } from "react-icons/gi";

const WhoWeAre = () => {
    return (
        <Flex h="full" alignItems="flex-start" justifyContent="space-between" flexDirection={{ base: "column", lg: "row" }} pt={20}>
            <Box flex="1">
                <Box borderTop="8px solid black" maxW="80px" mb={4}></Box>
                <Heading size="2xl" mb={8}>
                    WHO WE ARE
                </Heading>
                <Box pl={8}>
                    <Text fontSize="lg" maxW="2xl" lineHeight="tall">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin turpis vitae risus convallis, 
                        a volutpat justo lobortis. Quisque viverra sem erat, vel tincidunt urna dignissim ut. Fusce pharetra vulputate 
                        lorem, non gravida magna blandit et.
                    </Text>
                </Box>
            </Box>
            <Box flex="1" display="flex" justifyContent="center" alignItems="flex-start" pt={10}>
                <GiPlasticDuck fontSize="450px" color='#fbbc05' style={{ transform: 'scaleX(-1)' }}/>
            </Box>
        </Flex>
    );
};

export default WhoWeAre; 