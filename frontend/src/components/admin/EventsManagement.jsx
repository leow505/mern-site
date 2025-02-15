import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    useToast,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useDisclosure,
    Switch,
    Badge,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth';

const EventsManagement = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { token } = useAuthStore();

    // Fetch events data
    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setEvents(data.data);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch events',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Handle event deletion
    const handleEventDelete = async (eventId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            if (data.success) {
                toast({
                    title: 'Success',
                    description: 'Event deleted successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                fetchEvents(); // Refresh event list
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete event',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle event update
    const handleEventUpdate = async (eventId, updatedData) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });
            const data = await response.json();
            
            if (data.success) {
                toast({
                    title: 'Success',
                    description: 'Event updated successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                fetchEvents(); // Refresh event list
                onClose(); // Close the modal
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update event',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle featured toggle
    const handleFeaturedToggle = async (event) => {
        const updatedEvent = { ...event, featured: !event.featured };
        try {
            setIsLoading(true);
            const response = await fetch(`/api/events/${event._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedEvent)
            });
            const data = await response.json();
            
            if (data.success) {
                toast({
                    title: 'Success',
                    description: `Event ${updatedEvent.featured ? 'featured' : 'unfeatured'} successfully`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                fetchEvents(); // Refresh event list
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update event',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle opening edit modal
    const handleEditClick = (event) => {
        try {
            setSelectedEvent({
                ...event,
                date: new Date(event.date).toISOString().slice(0, 16) // Format date for datetime-local input
            });
            onOpen();
        } catch (error) {
            console.error('Error formatting date:', error);
            toast({
                title: 'Error',
                description: 'Failed to open edit modal',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        handleEventUpdate(selectedEvent._id, selectedEvent);
    };

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <>
            <Box overflowX="auto">
                <Table variant="simple" bg="white" rounded="md">
                    <Thead>
                        <Tr>
                            <Th>Event Name</Th>
                            <Th>Date</Th>
                            <Th>Location</Th>
                            <Th>Featured</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {events
                            .sort((a, b) => {
                                // Sort by featured status first (featured events at top)
                                if (a.featured && !b.featured) return -1;
                                if (!a.featured && b.featured) return 1;
                                // Then sort by date
                                return new Date(b.date) - new Date(a.date);
                            })
                            .map((event) => (
                            <Tr key={event._id}>
                                <Td>
                                    {event.name}
                                    {event.featured && (
                                        <Badge ml={2} colorScheme="yellow">
                                            Featured
                                        </Badge>
                                    )}
                                </Td>
                                <Td>{new Date(event.date).toLocaleDateString()}</Td>
                                <Td>{event.location}</Td>
                                <Td>
                                    <Switch
                                        isChecked={event.featured}
                                        onChange={() => handleFeaturedToggle(event)}
                                        colorScheme="yellow"
                                    />
                                </Td>
                                <Td>
                                    <HStack spacing={2}>
                                        <Button
                                            size="sm"
                                            colorScheme="blue"
                                            isLoading={isLoading}
                                            onClick={() => handleEditClick(event)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            colorScheme="red"
                                            isLoading={isLoading}
                                            onClick={() => handleEventDelete(event._id)}
                                        >
                                            Delete
                                        </Button>
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>

            {/* Edit Event Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>Edit Event</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Event Name</FormLabel>
                                <Input
                                    value={selectedEvent?.name || ''}
                                    onChange={(e) => setSelectedEvent({
                                        ...selectedEvent,
                                        name: e.target.value
                                    })}
                                    placeholder="Event Name"
                                    required
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Date and Time</FormLabel>
                                <Input
                                    type="datetime-local"
                                    value={selectedEvent?.date || ''}
                                    onChange={(e) => setSelectedEvent({
                                        ...selectedEvent,
                                        date: e.target.value
                                    })}
                                    required
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Location</FormLabel>
                                <Input
                                    value={selectedEvent?.location || ''}
                                    onChange={(e) => setSelectedEvent({
                                        ...selectedEvent,
                                        location: e.target.value
                                    })}
                                    placeholder="Location"
                                    required
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    value={selectedEvent?.description || ''}
                                    onChange={(e) => setSelectedEvent({
                                        ...selectedEvent,
                                        description: e.target.value
                                    })}
                                    placeholder="Event Description"
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Picture URL</FormLabel>
                                <Input
                                    value={selectedEvent?.picture || ''}
                                    onChange={(e) => setSelectedEvent({
                                        ...selectedEvent,
                                        picture: e.target.value
                                    })}
                                    placeholder="Picture URL"
                                />
                            </FormControl>
                            <FormControl display="flex" alignItems="center">
                                <FormLabel mb="0">
                                    Featured Event
                                </FormLabel>
                                <Switch
                                    colorScheme="yellow"
                                    isChecked={selectedEvent?.featured}
                                    onChange={(e) => setSelectedEvent({
                                        ...selectedEvent,
                                        featured: e.target.checked
                                    })}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
                                Save Changes
                            </Button>
                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EventsManagement; 