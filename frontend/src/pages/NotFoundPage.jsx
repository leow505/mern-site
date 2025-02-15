import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { GiPlasticDuck } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box minH="100vh" bg="#a2cfd4" display="flex" alignItems="center">
            <Container maxW="container.xl">
                <VStack spacing={8} alignItems="center">
                    <GiPlasticDuck fontSize="200px" color='#fbbc05' style={{ transform: 'scaleX(-1)' }}/>
                    <Heading size="4xl">404</Heading>
                    <Heading size="xl">Page Not Found</Heading>
                    <Text fontSize="xl" textAlign="center">
                        Oops! Looks like our duck wandered off to uncharted waters.
                    </Text>
                    <Button 
                        size="lg" 
                        bg="blue.400" 
                        color="white" 
                        _hover={{ bg: 'blue.500' }}
                        onClick={() => navigate('/')}
                    >
                        Return Home
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
};

export default NotFoundPage; 