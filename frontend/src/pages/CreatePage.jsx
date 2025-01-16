import { Box, Button, Container, Heading, Input, Textarea, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react"
import { useEventStore } from "../store/event";

const CreatePage = () => {

  const [ newEvent, setNewEvent ] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    picture: "",

  });

  const toast = useToast();

  const {createEvent} = useEventStore()

  const handleAddEvent = async() => {
    const {success, message} = await createEvent(newEvent);
    if(!success){
      toast({
        title:"Error",
        description: message,
        status: "error",
        isClosable:true
      })
    }else{
      toast({
        title:"Success",
        description: message,
        status: "success",
        isClosable:true
      });
      setNewEvent({name: "",
        description: "",
        date: "",
        location: "",
        picture: "",})
    }
  }

  return (
    <Container maxW={"container.sm"} bg="white" marginTop={5}>
      <VStack spacing={8}>
        <Heading>
          Create New Event
        </Heading>
        <Box
          w={"full"}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input 
              placeholder="Event Name"
              name='name'
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value})}
            />
            <Textarea 
              placeholder="Event Description"
              name='description'
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            />
            <Input 
              placeholder="Event Date"
              name='date'
              type="datetime-local"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            />
            <Input 
              placeholder="Event Location"
              name='location'
              value={newEvent.location}
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
            />
            <Input 
              placeholder="Add Picture Link"
              name='picture'
              value={newEvent.picture}
              onChange={(e) => setNewEvent({...newEvent, picture: e.target.value})}
            />
            <Button colorScheme="blue" onClick={handleAddEvent} w="full">Add Event</Button>
          </VStack>

        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage