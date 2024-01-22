package for4system.myApp.User.model.controller;

import for4system.myApp.User.model.User;
import for4system.myApp.User.model.repository.UserRepository;
import for4system.myApp.User.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserService userService;

    @PostMapping("/batchusers")
    public ResponseEntity<String> addBatchUsers(@RequestBody List<User> users){

        Instant start = Instant.now();
        List<User> savedUsers = userRepo.saveAll(users);
        //userRepo.saveAll(users);

        Instant end = Instant.now();

        Duration duration = Duration.between(start, end);
        long elapsedTimeInMilliseconds = duration.toMillis();
        long elapsedTimeInMicroseconds = duration.toNanos() / 1000;


        long elapsedTime = Duration.between(start, end).toMillis();
        int numberOfUsers = savedUsers.size();

        String responseMessage = String.format("Users added successfully. Total users: %d added, Time elapsed: %d microseconds", savedUsers.size(), elapsedTimeInMicroseconds);

        return ResponseEntity.ok(responseMessage);
    }
    //odczyt użytkowników z zaimplementowaną paginacją i sortowaniem
    @GetMapping("/getAll")
    public ResponseEntity<Page<User>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue= "100") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc")String sortDirection) {
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(page,size,Sort.by(direction,sortBy));
        Page<User> usersPage = userRepo.findAll(pageable);
        return ResponseEntity.ok(usersPage);
    }

    //dodawnie użyszkodników do bazy danych z pliku
    @PostMapping("/uploadJson")
    public ResponseEntity<String> uploadJson(@RequestParam("file") MultipartFile file){
        //konieczne sprawdzanie czy plik jest pusty
        if (file.isEmpty()) {
            return new ResponseEntity<>("Przesłany plik jest pusty", HttpStatus.BAD_REQUEST);
        }

        try{
            //zliczanie czasu do statystyk
            Instant start = Instant.now();

            byte[] jsonData = file.getBytes();

            userService.processAndSaveUserData(new String(jsonData));
            Instant end = Instant.now();
            //koniec liczenia czasu i reset ilości dodanych danych
            int recordsCount = userService.getRecordsCount();
            userService.resetRecordsCount();
            Duration duration = Duration.between(start,end);

            return ResponseEntity.ok(String.format(
                    "Users added successfully. Time elapsed: %d microseconds. Total users: %d added",
                    duration.toMillis(), recordsCount));
        } catch(IOException e){
            e.printStackTrace();
            return  new ResponseEntity<>("Błąd podczas przetwarzania pliku: ",HttpStatus.I_AM_A_TEAPOT);
        }
    }

}
