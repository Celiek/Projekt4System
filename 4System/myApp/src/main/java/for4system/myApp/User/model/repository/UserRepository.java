package for4system.myApp.User.model.repository;
import for4system.myApp.User.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User,Long> {

    void deleteAll();
    Optional<User> findUserById(Long id);
}
