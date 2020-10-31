package com.power222.tuimspfcauppbj.controller;

import com.power222.tuimspfcauppbj.model.Contract;
import com.power222.tuimspfcauppbj.service.ContractService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contract")
public class ContractController {

    private final ContractService svc;

    public ContractController(ContractService svc) {
        this.svc = svc;
    }

    @GetMapping
    public List<Contract> getAllContracts() {
        return svc.getAllContract();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable long id) {
        return svc.getContractById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contract> updateContract(@PathVariable long id, @RequestBody Contract requestBody) {
        return svc.updateContract(id, requestBody).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void contractInterview(@PathVariable long id) {
        svc.deleteContractById(id);
    }

}
