import { useState, useEffect } from 'react';
import { Box, Heading, Text, SimpleGrid, useToast, Center, Spinner } from '@chakra-ui/react';
import { GiPlasticDuck } from "react-icons/gi";
import OfficerApplication from './OfficerApplication';

const Officers = () => {
    const [officers, setOfficers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchOfficers = async () => {
            try {
                const response = await fetch('/api/auth/officers');
                const data = await response.json();
                
                if (data.success) {
                    setOfficers(data.data);
                } else {
                    throw new Error(data.message || 'Failed to fetch officers');
                }
            } catch (error) {
                console.error('Error fetching officers:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch officers data',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchOfficers();
    }, [toast]);

    if (isLoading) {
        return (
            <Center h="50vh">
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }

    return (
        <>
            <Box borderTop="8px solid black" maxW="80px" mb={4}></Box>
            <Heading size="2xl" mb={8}>OFFICERS</Heading>
            {officers.length > 0 ? (
                <SimpleGrid 
                    columns={{ base: 1, md: 2, lg: 3 }} 
                    spacing={4} 
                    templateColumns="repeat(3, 1fr)"
                >
                    {officers.map((officer) => (
                        <Box 
                            key={officer._id} 
                            bg="#d8e3e7" 
                            p={6} 
                            borderRadius="md"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Box>
                                <GiPlasticDuck fontSize="150px" color='#fbbc05' style={{ transform: 'scaleX(-1)' }}/>
                            </Box>
                            <Heading as='h3' size='lg' mt={4}>{officer.name}</Heading>
                            <Text fontSize="md" color="gray.600" mt={2}>{officer.title || 'Officer'}</Text>
                            <Text fontSize="md" textAlign="center" mt={4}>
                                {officer.description || 'Club Officer'}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            ) : (
                <Box textAlign="center" py={10}>
                    <Text fontSize="lg" color="gray.600">
                        No officers found at this time.
                    </Text>
                </Box>
            )}

            {/* Officer Application Section */}
            <OfficerApplication />
        </>
    );
};

export default Officers; 