import { useColorModeValue, Box, Image, Heading, Text, IconButton, HStack, useToast, Modal, useDisclosure, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, Input, Button, VStack, ModalFooter} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({product}) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);
    const toast = useToast();

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, updateProduct} = useProductStore();

    const{isOpen, onOpen, onClose} = useDisclosure();

    const handleUpdateProduct = async (pid, updatedProduct) => {
        await updateProduct(pid, updatedProduct);
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();
        if (success) {
        toast({
            title: "Success",
            description: message,
            status: "success",
            isClosable: true
        })
        } else {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        }
    }

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        
        if (success) {
        toast({
            title: "Success",
            description: message,
            status: "success",
            isClosable: true
        })
        } else {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        }
    }

    return (
        <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit="cover"/>
        
            <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton onClick={onOpen} icon={<FaEdit/>} colorScheme="blue"/>
                <IconButton onClick={() => handleDeleteProduct(product._id)} icon={<MdDelete/>} colorScheme="red"/>
            </HStack>
            </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack spacing={4}>
                                            <Input
                                                placeholder="Product Name"
                                                name="name"
                                                value={updatedProduct.name}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}
                                            />
                                            <Input
                                                placeholder="Price"
                                                name="price"
                                                type="number"
                                                value={updatedProduct.price}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}                          />
                                            <Input
                                                placeholder="Image URL"
                                                name="image"
                                                value={updatedProduct.image}
                                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}

                                            />
                        
                                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    
                </ModalContent>
            </ModalOverlay>

        </Modal>
        </Box>

    );
}
 
export default ProductCard;