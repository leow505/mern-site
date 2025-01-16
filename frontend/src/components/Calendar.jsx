import { useState, useEffect } from 'react';
import { Box, Flex, IconButton, HStack, Heading, VStack, List, ListItem } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useEventStore } from '../store/event';
import Eventlist from './Eventlist';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const { fetchEvents,events } = useEventStore();
    const [ filterEvents, setFilterEvents] = useState([]);

    const prevMonth = () => {
        const prev = new Date(currentMonth);
        prev.setMonth(prev.getMonth() - 1);
        setCurrentMonth(prev);
    };

    const nextMonth = () => {
        const next = new Date(currentMonth);
        next.setMonth(next.getMonth() + 1);
        setCurrentMonth(next);
    };

    const getEvents = () => {
        const eventsInCurrentMonth = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === currentMonth.getMonth() && eventDate.getFullYear() === currentMonth.getFullYear();
        });
        setFilterEvents(eventsInCurrentMonth);
    };

    useEffect(() => {
        fetchEvents();
        getEvents();
    },[currentMonth, fetchEvents, events]);

    const monthName = currentMonth.toLocaleDateString('default', {month: 'long'});

    return (
        <VStack alignItems="flex-start" bg="#1e1e1e" color="white" borderRadius="md" w="full">
            <Heading p={5} fontWeight="md">Schedule</Heading>
            <HStack bg="gray" p={5} w="full" m={0} alignItems="center">
                <Box w="full">
                    <Flex justify="space-between" align="center" gap={5}>
                        <IconButton icon={<ChevronLeftIcon />} onClick={prevMonth} />
                        <Heading fontWeight="md">{monthName}</Heading>
                        <IconButton icon={<ChevronRightIcon />} onClick={nextMonth} />
                    </Flex>
                </Box>
            </HStack>
            <HStack w="full">
                {/* List of Events */}
                <List w="full">
                    
                        {filterEvents.map((event, index) =>(
                            <ListItem key={index} bg={index % 2 !== 0 ? '#292929' : 'transparent'}>
                                <Eventlist key={event._id} event={event} />
                            </ListItem>
                        ))}  
                    {filterEvents.length === 0 && (
                        <Box p={5}>No events for this month.</Box>
                    )}
                </List>
            </HStack>
        </VStack>
    )
}

export default Calendar