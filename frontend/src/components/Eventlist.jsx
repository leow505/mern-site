import { 
    Box, 
    VStack, 
    Flex, 
    HStack, 
    Button, 
    useDisclosure, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay,
    Image,
    Text,
    Divider,
    Badge,
    Icon
} from '@chakra-ui/react'
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline, IoInformationCircleOutline } from 'react-icons/io5'

const Eventlist = ( {event} ) =>{
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    return (
        <VStack w="full">
            <Flex gap={10} p={5} w="full" justifyContent="space-between">
                <HStack>
                    <Box>{new Date(event.date).toLocaleDateString()}</Box>
                    <Box>{event.name}</Box>
                </HStack>
                <HStack>
                    <Button 
                        onClick={onOpen} 
                        colorScheme="teal" 
                        variant="outline"
                        size="sm"
                        leftIcon={<IoInformationCircleOutline />}
                        _hover={{ bg: 'teal.50' }}
                    >
                        View Details
                    </Button>
                </HStack>
            </Flex>
            <Box>
                <Modal 
                    isOpen={isOpen} 
                    onClose={onClose} 
                    isCentered 
                    motionPreset='slideInBottom'
                    size="lg"
                >
                    <ModalOverlay 
                        bg="blackAlpha.300"
                        backdropFilter="blur(10px)"
                    />
                    <ModalContent>
                        <ModalHeader>{event.name}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box>
                                <HStack spacing={2} color="teal.600">
                                    <Icon as={IoCalendarOutline} />
                                    <Text>Date: {formatDate(event.date)}</Text>
                                </HStack>
                            </Box>
                            <Box mt={4}>
                                <HStack spacing={2} color="teal.600">
                                    <Icon as={IoTimeOutline} />
                                    <Text>Time: {formatTime(event.date)}</Text>
                                </HStack>
                            </Box>
                            <Box mt={4}>
                                <HStack spacing={2} color="teal.600">
                                    <Icon as={IoLocationOutline} />
                                    <Text>Location: {event.location}</Text>
                                </HStack>
                            </Box>
                            <Box mt={4}>
                                <Text mb={2}>Description:</Text>
                                <Text color="gray.600">
                                    {event.description || 'No description available.'}
                                </Text>
                            </Box>
                        </ModalBody>
                        <ModalFooter gap={3}>
                            <Button
                                colorScheme="teal"
                                leftIcon={<IoCalendarOutline />}
                            >
                                Add To Calendar
                            </Button>
                            <Button 
                                variant="ghost" 
                                onClick={onClose}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </VStack>
    )
};

export default Eventlist;