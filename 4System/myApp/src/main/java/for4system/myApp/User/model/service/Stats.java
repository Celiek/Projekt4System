package for4system.myApp.User.model.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Stats {
    private int recordsProcessed;
    private long processingTimeMillis;
}
