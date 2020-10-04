package com.power222.tuimspfcauppbj.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PasswordDTO {

    private String username;
    private String oldPassword;
    private String newPassword;
}
