// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/// @title Asset
/// @dev Store & retrieve quantity of a vaccine

contract Asset {
    address public creatorAdmin;
    enum Status {NotExist, Pending, Approved, Rejected}
    enum Role {Visitor, User, Admin, SuperAdmin}

    // Struct to store all vaccine related details
    struct VaccineDetail {
        Status status;
        uint256 quantity;
        address currOwner;
    }

    mapping(uint256 => VaccineDetail) public vaccines; // Stores all vaccines vaccineId -> vaccine Detail
    mapping(uint256 => address) public vaccineOwnerChange; // Keeps track of vaccine owner VaccId -> Owner Address
    mapping(address => Role) public userRoles; // Keeps track of user roles
    mapping(address => bool) public verifiedUsers; // Keeps track of verified user, userId -> verified (true / false)

    // Modifier to ensure only the vaccine owner access
    // a specific vaccine
    modifier onlyOwner(uint256 _vaccId) {
        require(vaccines[_vaccId].currOwner == msg.sender);
        _;
    }

    // Modifier to ensure only the verified user access
    // a specific vaccine
    modifier verifiedUser(address _user) {
        require(verifiedUsers[_user]);
        _;
    }

    // Modifier to ensure only the verified admin access a function
    modifier verifiedAdmin() {
        require(
            userRoles[msg.sender] >= Role.Admin && verifiedUsers[msg.sender]
        );
        _;
    }

    // Modifier to ensure only the verified super admin admin access a function
    modifier verifiedSuperAdmin() {
        require(
            userRoles[msg.sender] == Role.SuperAdmin &&
                verifiedUsers[msg.sender]
        );
        _;
    }

    // Initializing the Contract.
    constructor() public {
        creatorAdmin = msg.sender;
        userRoles[creatorAdmin] = Role.SuperAdmin;
        verifiedUsers[creatorAdmin] = true;
    }

    /// @dev Function to create vaccine
    /// @param _vaccId Identifier for vaccine
    /// @param _quantity vaccine Price
    /// @param _owner Ownwe address vaccine
    function createVaccine(
        uint256 _vaccId,
        uint256 _quantity,
        address _owner
    ) external verifiedAdmin verifiedUser(_owner) returns (bool) {
        vaccines[_vaccId] = VaccineDetail(Status.Pending, _quantity, _owner);
        return true;
    }

    /// @dev Approve vaccine
    /// @param _vaccId Identifier for vaccine
    function approveVaccine(uint256 _vaccId)
        external
        verifiedSuperAdmin
        returns (bool)
    {
        require(vaccines[_vaccId].currOwner != msg.sender);
        vaccines[_vaccId].status = Status.Approved;
        return true;
    }

    /// @dev Function to reject vaccine
    /// @param _vaccId Identifier for vaccine
    function rejectVaccine(uint256 _vaccId)
        external
        verifiedSuperAdmin
        returns (bool)
    {
        require(vaccines[_vaccId].currOwner != msg.sender);
        vaccines[_vaccId].status = Status.Rejected;
        return true;
    }

    /// @dev Function to change vaccine ownership
    /// @param _vaccId Identifier for vaccine
    /// @param _newOwner new Owner address for vaccine
    function changeOwnership(uint256 _vaccId, address _newOwner)
        external
        onlyOwner(_vaccId)
        verifiedUser(_newOwner)
        returns (bool)
    {
        require(vaccines[_vaccId].currOwner != _newOwner);
        require(vaccineOwnerChange[_vaccId] == address(0));
        vaccineOwnerChange[_vaccId] = _newOwner;
        return true;
    }

    /// @dev Function to approve change of ownership
    /// @param _vaccId Identifier for vaccine
    function approveChangeOwnership(uint256 _vaccId)
        external
        verifiedSuperAdmin
        returns (bool)
    {
        require(vaccineOwnerChange[_vaccId] != address(0));
        vaccines[_vaccId].currOwner = vaccineOwnerChange[_vaccId];
        vaccineOwnerChange[_vaccId] = address(0);
        return true;
    }

    /// @dev Function to change vaccine Quantity
    /// @param _vaccId Identifier for vaccine
    /// @param _newQuantity New vaccine Price
    function changeQuantity(uint256 _vaccId, uint256 _newQuantity)
        external
        onlyOwner(_vaccId)
        returns (bool)
    {
        require(vaccineOwnerChange[_vaccId] == address(0));
        vaccines[_vaccId].quantity = _newQuantity;
        return true;
    }

    /// @dev Function to create vaccine
    /// @param _vaccId Identifier for vaccine
    function getVaccineDetails(uint256 _vaccId)
        public
        view
        returns (
            Status,
            uint256,
            address
        )
    {
        return (
            vaccines[_vaccId].status,
            vaccines[_vaccId].quantity,
            vaccines[_vaccId].currOwner
        );
    }

    /// @dev Function to add a new user
    /// @param _newUser new user address
    function addNewUser(address _newUser)
        external
        verifiedAdmin
        returns (bool)
    {
        require(userRoles[_newUser] == Role.Visitor);
        require(verifiedUsers[_newUser] == false);
        userRoles[_newUser] = Role.User;
        return true;
    }

    /// @dev Function to add a new admin
    /// @param _newAdmin new admin user address
    function addNewAdmin(address _newAdmin)
        external
        verifiedSuperAdmin
        returns (bool)
    {
        require(userRoles[_newAdmin] == Role.Visitor);
        require(verifiedUsers[_newAdmin] == false);
        userRoles[_newAdmin] = Role.Admin;
        return true;
    }

    /// @dev Function to add a new admin
    /// @param _newSuperAdmin new super admin user address
    function addNewSuperAdmin(address _newSuperAdmin)
        external
        verifiedSuperAdmin
        returns (bool)
    {
        require(userRoles[_newSuperAdmin] == Role.Visitor);
        require(verifiedUsers[_newSuperAdmin] == false);
        userRoles[_newSuperAdmin] = Role.SuperAdmin;
        return true;
    }

    /// @dev Function to add a new admin
    /// @param _newUser user address to approve
    function approveUsers(address _newUser)
        external
        verifiedSuperAdmin
        returns (bool)
    {
        require(userRoles[_newUser] != Role.Visitor);
        verifiedUsers[_newUser] = true;
        return true;
    }
    /// @dev Function to return role
    /// @param _userAdd user address
    function checkSuperAdmin(address _userAdd)
        public view
        returns (bool){
            if(userRoles[_userAdd] == Role.SuperAdmin){
                return true;
            }
            else{
                return false;
            }
        }
}
