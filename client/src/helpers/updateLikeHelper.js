import { GET_MESSAGES } from "../queries";
import { orderBy } from "../constants";

const updateLikesStore = ( messageId ) => (cache, { data: { updateLikes } })  => {
    const { messages } = cache.readQuery({
        query: GET_MESSAGES,
        variables: { orderBy },
    });
    const updatedLikes = messages.messageList.map(item => {
        if (item.id === messageId) {

            return {
                ...item,
                likes: updateLikes.likes,
            };
        }

        return item;
    });

    cache.writeQuery({
        query: GET_MESSAGES,
        variables: { orderBy },
        data: { messages: { ...messages, messageList: updatedLikes } },
    });

}

export { updateLikesStore };