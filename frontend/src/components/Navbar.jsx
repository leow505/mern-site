import { Button, Flex, Heading, HStack, IconButton, List, ListItem, Box } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { IoMenu } from "react-icons/io5";
import { FaMeta, FaXTwitter, FaDiscord } from "react-icons/fa6";

const navbarLinks = [
  { name: "Events", href: "/" },
  { name: "About", href: "/about"},
  { name: "Login", href: "/login" }
];

const socialIcons = [
  { icon: <FaMeta size={25}/>, link: "https://www.meta.com" },
  { icon: <FaXTwitter size={25}/>, link: "https://twitter.com" },
  { icon: <FaDiscord size={25}/>, link: "https://discord.com" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <HStack 
      w="full" 
      alignItems="center"  
      justifyContent="center"
      bg="#d8e3e7"
      shadow="md" 
    >
      <Flex 
        alignItems={"center"} 
        justifyContent="space-between"
        maxW="container.lg" 
        w="full" 
        mx="auto"
        px={5}
      >
        <Heading fontWeight="medium" display="flex">
          <Link to={"/"}>CS Club</Link>
        </Heading>
        <List display={{base: "none", md:'flex'}}>
          {navbarLinks.map((link, index) =>(
            <ListItem key={index}>
              <Button 
                p="25px 50px" 
                size="lg" 
                href={link.href} 
                borderRadius="0" 
                variant="plain" 
                borderBottom="10px solid #9fcacf" 
                _hover={{
                  borderBottomColor: "#f9ac00",
                }}
                borderBottomColor={location.pathname === link.href ? "#f9ac00" : "#9fcacf"}
              >
                <Link to={link.href} >{link.name}</Link>
              </Button>
            </ListItem>
            
          ))}
        </List>
        <IconButton aria-label="menu" colorScheme="teal" variant="ghost" icon={<IoMenu />} rounded="full" display={{base:"flex", md:"none"}}/>
        <Flex gap={5} display={{base:"none", md:"flex"}}>
          {socialIcons.map((social, index) => (
            <Link fontSize={50} key={index} to={social.link}>
              <Box _hover={{
                  color: "#f9ac00",
                }}>{social.icon}</Box>
            </Link>
          ))}
        </Flex>
      </Flex>
    </HStack>
  )
}

export default Navbar