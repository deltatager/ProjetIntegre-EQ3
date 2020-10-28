package com.power222.tuimspfcauppbj.controller;

import com.power222.tuimspfcauppbj.model.Contract;
import com.power222.tuimspfcauppbj.service.ContractService;
import com.power222.tuimspfcauppbj.service.MailSendingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sendMail")
public class SendMailController {
    private MailSendingService mailService;
    private ContractService contractService;

    public SendMailController(MailSendingService mailService, ContractService contractService) {
        this.mailService = mailService;
        this.contractService = contractService;
    }

    @PostMapping("/contract")
    public void SendContractByMail(@RequestBody Contract contract) {
        mailService.sendEmail(contract.getStudentApplication().getOffer().getEmployer(), "contract.pdf", contract.getFile());
    }


}
