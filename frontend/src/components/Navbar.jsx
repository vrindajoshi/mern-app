import { Button, Container, Flex, HStack, Text, useColorMode} from "@chakra-ui/react";
import { base } from "framer-motion/client";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineLightMode, MdLightMode } from "react-icons/md";


const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    
    return <Container maxW={"1140px"} paddingx={4} >
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                md: "row"
            }}
        >

        <Text
            fonstSize={{ base: "22", sm: "28"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
        >
            <Link to="/">Product Store </Link>
            {/* <Link to="/create">Create Product </Link> */}
        </Text>
        
        <HStack spacing={2} alignItems={"center"}>
            <Link to="/">
                <Button> 
                    <CiSquarePlus /> 
                </Button>
            </Link>
            <Link to="/create">
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <MdOutlineLightMode /> : <MdLightMode />}
                </Button>
            </Link>
        </HStack>

        </Flex>
    </Container>;
}
 
export default Navbar;