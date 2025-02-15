import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Text,
    Link,
    useToast,
    Container,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await login({ email, password });
            console.log('Login response:', response);
            
            if (response.success) {
                toast({
                    title: 'Login Successful',
                    description: 'Welcome back!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                
                navigate('/');
            } else {
                toast({
                    title: 'Login Failed',
                    description: response.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: 'Login Failed',
                description: 'An unexpected error occurred',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="container.sm" py={10}>
            <Box
                p={8}
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                bg="white"
            >
                <VStack spacing={4} align="stretch">
                    <Heading textAlign="center" mb={6}>Welcome Back</Heading>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                colorScheme="teal"
                                width="full"
                                mt={4}
                                isLoading={isLoading}
                            >
                                Sign In
                            </Button>
                        </VStack>
                    </form>
                    <Text textAlign="center" mt={4}>
                        Don't have an account?{' '}
                        <Link color="teal.500" href="/register">
                            Sign up
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Container>
    );
};

export default LoginPage;