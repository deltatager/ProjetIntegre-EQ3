package com.power222.tuimspfcauppbj.service;

import com.power222.tuimspfcauppbj.dao.ContractRepository;
import com.power222.tuimspfcauppbj.model.Contract;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ContractService {
    private final ContractRepository contractRepo;

    public ContractService(ContractRepository contractRepo) {
        this.contractRepo = contractRepo;
    }

    public Contract createAndSaveNewContract(Contract contract) {
        return contractRepo.saveAndFlush(contract);
    }

    public List<Contract> getAllContract() {
        return contractRepo.findAll();
    }

    public List<Contract> getAllContractsByEmployerId(long id) {
        return contractRepo.findAllByStudentApplication_Offer_Employer_Id(id);
    }

    public Optional<Contract> getContractById(long id) {
        return contractRepo.findById(id);
    }

    public Optional<Contract> updateContract(long id, Contract contract) {
        return contractRepo.findById(id)
                .map(oldContract -> {
                    contract.setId(oldContract.getId());
                    contract.setSemester(oldContract.getSemester());
                    return Optional.of(contractRepo.saveAndFlush(contract));
                })
                .orElse(Optional.empty());
    }

    @Transactional
    public void deleteContractById(long id) {
        contractRepo.deleteById(id);
    }
}
