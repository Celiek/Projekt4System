package for4system.myApp.User.model.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import for4system.myApp.User.model.User;
import for4system.myApp.User.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class UserService {

    private final UserRepository userRepo;

    //do zliczania statystyk dodanych rekordów
    private int records = 0;

    public int getRecordsCount() {
        return records;
    }

    public void resetRecordsCount() {
        records = 0;
    }

    @Autowired
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public void processAndSaveUserData(String jsonData) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode jsonNode = objectMapper.readTree(jsonData);

            if (jsonNode.isArray()) {
                for (JsonNode userNode : jsonNode) {
                    User user = objectMapper.treeToValue(userNode, User.class);
                    userRepo.save(user);
                    records++;
                }
            } else if (jsonNode.isObject()) {
                User user = objectMapper.treeToValue(jsonNode, User.class);
                userRepo.save(user);
                records++;
            } else {
                throw new IOException("Unexpected Json format");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
