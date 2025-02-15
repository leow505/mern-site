import { useEffect, useState } from "react";
import { 
    Box, 
    Text, 
    Button, 
    Spinner, 
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    HStack,
    Icon
} from '@chakra-ui/react';
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline } from 'react-icons/io5';

// Default slides as fallback
const defaultSlides = [
    {
        image: "https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
        name: "Current event name",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2h8ZW58MHx8MHx8fDA%3D",
        name: "Another Event",
        description: "This is the description of another event.",
    },
    {
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHRlY2h8ZW58MHx8MHx8fDA%3D",
        name: "Third Event",
        description: "Here is some text for the third event slide.",
    },
];

const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSlide, setSelectedSlide] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const fetchFeaturedEvents = async () => {
            try {
                const response = await fetch('/api/events');
                const data = await response.json();

                if (data.success && data.data.length > 0) {
                    // Filter for featured events and map them to slide format
                    const featuredEvents = data.data
                        .filter(event => event.featured)
                        .map((event, index) => ({
                            _id: event._id,
                            image: event.picture || defaultSlides[index % defaultSlides.length].image,
                            name: event.name,
                            description: event.description,
                            date: new Date(event.date),
                            location: event.location
                        }));

                    if (featuredEvents.length > 0) {
                        setSlides(featuredEvents);
                    } else {
                        setSlides(defaultSlides);
                    }
                } else {
                    setSlides(defaultSlides);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setSlides(defaultSlides);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedEvents();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleViewDetails = (slide) => {
        setSelectedSlide(slide);
        onOpen();
    };

    const handleCloseModal = () => {
        onClose();
        setSelectedSlide(null);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    if (isLoading) {
        return (
            <Center h="md">
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }

    const currentSlide = slides[currentIndex];

    return(
        <Box
            w="full"
            borderRadius="md"
            overflow="hidden"
            position="relative"
            bg="gray.800"
        >
            {/* Slide Content */}
            <Box
                h={{ base: "md", md: "2xl" }}
                bgImage={`url(${currentSlide.image})`}
                bgSize="cover"
                bgPosition="center"
                transition="all 0.5s ease-in-out"
            >
                <Box
                    position="absolute"
                    bottom="0"
                    w="full"
                    bg="rgba(70, 69, 69, 0.8)"
                    color="white"
                    p={6}
                >
                    <Box position="relative">
                        <Text 
                            fontSize={{ base: "2xl", md: "3xl" }} 
                            fontWeight="bold"
                            mb={3}
                        >
                            {currentSlide.name}
                        </Text>
                        <Text 
                            fontSize={{ base: "lg", md: "xl" }} 
                            mt="3" 
                            noOfLines={2}
                            lineHeight="tall"
                        >
                            {currentSlide.description}
                        </Text>
                        <Box display="flex" justifyContent="flex-end" mt={6}>
                            <Button 
                                bg="black" 
                                variant="solid" 
                                color="white"
                                size="lg"
                                fontSize="lg"
                                px={8}
                                onClick={() => handleViewDetails(currentSlide)}
                                _hover={{
                                    color: "#f9ac00", 
                                    bg: "gray.800"
                                }}
                            >
                                View Details
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Navigation Buttons */}
            <Box
                position="absolute"
                top="0"
                right="0"
                display="flex"
                gap="8px"
                bg="gray"
                borderRadius="md"
                opacity="0.8"
                p={3}
            >
                {slides.map((_, index) => (
                    <Box
                        key={index}
                        w="20px"
                        h="20px"
                        borderRadius="full"
                        bg="transparent"
                        border={`4px solid ${index === currentIndex ? "white" : "black"}`}
                        cursor="pointer"
                        onClick={() => goToSlide(index)}
                        margin={1}
                    />
                ))}
            </Box>

            {/* Event Details Modal */}
            <Modal 
                isOpen={isOpen} 
                onClose={handleCloseModal} 
                isCentered 
                motionPreset='slideInBottom'
                size="lg"
            >
                <ModalOverlay 
                    bg="blackAlpha.300"
                    backdropFilter="blur(10px)"
                />
                <ModalContent>
                    <ModalHeader>{selectedSlide?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <HStack spacing={3} color="teal.600">
                                <Icon as={IoCalendarOutline} />
                                <Text>
                                    Date: {selectedSlide?.date ? formatDate(selectedSlide.date) : 'N/A'}
                                </Text>
                            </HStack>
                        </Box>
                        <Box mt={4}>
                            <HStack spacing={3} color="teal.600">
                                <Icon as={IoTimeOutline} />
                                <Text>
                                    Time: {selectedSlide?.date ? formatTime(selectedSlide.date) : 'N/A'}
                                </Text>
                            </HStack>
                        </Box>
                        <Box mt={4}>
                            <HStack spacing={3} color="teal.600">
                                <Icon as={IoLocationOutline} />
                                <Text>
                                    Location: {selectedSlide?.location || 'N/A'}
                                </Text>
                            </HStack>
                        </Box>
                        <Box mt={6}>
                            <Text mb={3}>
                                Description:
                            </Text>
                            <Text color="gray.700">
                                {selectedSlide?.description || 'No description available.'}
                            </Text>
                        </Box>
                    </ModalBody>
                    <ModalFooter gap={3}>
                        {selectedSlide?._id && (
                            <Button
                                colorScheme="teal"
                                leftIcon={<IoCalendarOutline />}
                            >
                                Add To Calendar
                            </Button>
                        )}
                        <Button 
                            variant="ghost" 
                            onClick={handleCloseModal}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Slideshow;