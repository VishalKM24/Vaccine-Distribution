var web3;
var accounts;
var network;
var accounts;
App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    network = await web3.eth.net.getNetworkType();
    accounts = await web3.eth.getAccounts();
    await window.ethereum.enable();
    return App.initContract();
  },

  initContract: function () {
    var abi = [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "creatorAdmin",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "vaccineOwnerChange",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "vaccines",
        outputs: [
          {
            internalType: "enum Asset.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "currOwner",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userRoles",
        outputs: [
          {
            internalType: "enum Asset.Role",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "verifiedUsers",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_vaccId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_quantity",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
        ],
        name: "createVaccine",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_vaccId",
            type: "uint256",
          },
        ],
        name: "approveVaccine",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_vaccId",
            type: "uint256",
          },
        ],
        name: "rejectVaccine",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_vaccId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_newOwner",
            type: "address",
          },
        ],
        name: "changeOwnership",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_vaccId",
            type: "uint256",
          },
        ],
        name: "approveChangeOwnership",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_vaccId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_newQuantity",
            type: "uint256",
          },
        ],
        name: "changeQuantity",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_vaccId",
            type: "uint256",
          },
        ],
        name: "getVaccineDetails",
        outputs: [
          {
            internalType: "enum Asset.Status",
            name: "",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_newUser",
            type: "address",
          },
        ],
        name: "addNewUser",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_newAdmin",
            type: "address",
          },
        ],
        name: "addNewAdmin",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_newSuperAdmin",
            type: "address",
          },
        ],
        name: "addNewSuperAdmin",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_newUser",
            type: "address",
          },
        ],
        name: "approveUsers",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_userAdd",
            type: "address",
          },
        ],
        name: "checkSuperAdmin",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
      },
    ];

    App.contracts.asset = new web3.eth.Contract(
      abi,
      ""
    );

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", "#btn-VaccAdd", App.createVaccine);
    $(document).on("click", "#btn-VaccApprove", App.approveVaccine);
    $(document).on("click", "#btn-VaccReject", App.rejectVaccine);
    $(document).on("click", "#btn-VaccReqChange", App.reqchangeOwnership);
    $(document).on("click", "#btn-VaccAcptChange", App.approveChangeOwnership);
    $(document).on("click", "#btn-VaccValChange", App.changeQuantity);
    $(document).on("click", "#btn-VaccSearch", App.getVaccineDetails);
    $(document).on("click", "#btn-VaccAddUser", App.adduser);
    $(document).on("click", "#btn-VaccApproveUser", App.approveUsers);
  },

  createVaccine: function (event) {
    event.preventDefault();

    var VaccId = $("#VaccAdd #VaccId").val();
    var VaccVal = $("#VaccAdd #VaccVal").val();
    var VaccOwner = $("#VaccAdd #VaccOwner").val();
    console.log(VaccId, VaccVal, VaccOwner);

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.asset.methods
        .createVaccine(VaccId, VaccVal, VaccOwner)
        .send(
          {
            from: accounts[0],
            gas: 1000000,
            gasPrice: web3.utils.toWei("20", "gwei"),
          },
          function (error, result) {
            if (!error) console.log(JSON.stringify(result));
            else {
              alert(error);
              console.error(error);
            }
          }
        );
    });
  },

  approveVaccine: function (event) {
    event.preventDefault();
    var VaccId = $("#VaccSearchform #VaccSearch").val();
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      App.contracts.asset.methods.approveVaccine(VaccId).send(
        {
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("20", "gwei"),
        },
        function (error, result) {
          if (!error) console.log(JSON.stringify(result));
          else console.error(error);
        }
      );
    });
  },
  rejectVaccine: function (event) {
    event.preventDefault();
    var VaccId = $("#VaccSearchform #VaccSearch").val();
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      App.contracts.asset.methods.rejectVaccine(VaccId).send(
        {
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("20", "gwei"),
        },
        function (error, result) {
          if (!error) console.log(JSON.stringify(result));
          else console.error(error);
        }
      );
    });
  },
  reqchangeOwnership: function (event) {
    event.preventDefault();
    var VaccId = $("#VaccSearchform #VaccSearch").val();
    var NewOwner = $("#VaccReqChangeform #VaccReqChange").val();
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      App.contracts.asset.methods.changeOwnership(VaccId, NewOwner).send(
        {
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("20", "gwei"),
        },
        function (error, result) {
          if (!error) console.log(JSON.stringify(result));
          else console.error(error);
        }
      );
    });
  },
  approveChangeOwnership: function (event) {
    event.preventDefault();
    var VaccId = $("#VaccSearchform #VaccSearch").val();
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      App.contracts.asset.methods.approveChangeOwnership(VaccId).send(
        {
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("20", "gwei"),
        },
        function (error, result) {
          if (!error) console.log(JSON.stringify(result));
          else console.error(error);
        }
      );
    });
  },
  changeQuantity: function (event) {
    event.preventDefault();
    var VaccId = $("#VaccSearchform #VaccSearch").val();
    var NewVal = $("#VaccValChangeform #VaccValChange").val();
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      console.log(NewVal);
      App.contracts.asset.methods.changeQuantity(VaccId, NewVal).send(
        {
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("20", "gwei"),
        },
        function (error, result) {
          if (!error) console.log(JSON.stringify(result));
          else console.error(error);
        }
      );
    });
  },
  getVaccineDetails: function () {
    //  event.preventDefault();
    var VaccId = $("#VaccSearchform #VaccSearch").val();
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      App.contracts.asset.methods.getVaccineDetails(VaccId).call(
        {
          from: accounts[0],
        },
        function (error, result) {
          if (!error) {
            console.log(JSON.stringify(result));

            var state = result[0];
            var curr_owner = result[2];

            $("#resultVaccId").text(VaccId);

            if (state == 0) {
              $("#resultVaccStatus").text("NotExist");
              $("#resultVaccFunc1 #btn-VaccApprove").attr("disabled", true);
              $("#resultVaccFunc2 #btn-VaccReject").attr("disabled", true);
              $(".sec1").html("");
              $(".sec2").html("");
              $(".sec3").html("");
            } else if (state == 1) {
              $("#resultVaccStatus").text("Pending");
              $("#resultVaccFunc1").html(
                '<a href="#" id="btn-VaccApprove" class="btn btn-primary">Approve</a>'
              );
              $("#resultVaccFunc2").html(
                '<a href="#" id="btn-VaccReject" class="btn btn-primary">Reject</a>'
              );
              $(".sec1").html("");
              $(".sec2").html("");
              $(".sec3").html("");
            } else if (state == 2) {
              $("#resultVaccStatus").text("Approved");

              $("#resultVaccFunc1 #btn-VaccApprove").attr("disabled", true);
              $("#resultVaccFunc2 #btn-VaccReject").attr("disabled", true);
              $(".sec1").html("");
              $(".sec2").html("");
              $(".sec3").html("");

              App.contracts.asset.methods.vaccineOwnerChange(VaccId).send(
                {
                  from: accounts[0],
                  gas: 1000000,
                  gasPrice: web3.utils.toWei("20", "gwei"),
                },
                function (error, result) {
                  console.log(result);
                  if (!error) {
                    if (
                      curr_owner == accounts[0]
                    ) {
                      $(".sec1").html(
                        '<form action="#" id ="VaccReqChangeform"><div class="form-group"><label>Request Change of Ownership</label><input type="text"  id="VaccReqChange" name="VaccReqChange" placeholder="Enter New Owner Address" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></div></form><br/><button type="submit"  class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" id="btn-VaccReqChange"  form="form1" value="Submit">Request</button>'
                      );
                      $(".sec3").html(
                        '<form action="#" id="VaccValChangeform"><div class="form-group"><label>Change Vaccine Quantity</label><input type="text"  id="VaccValChange" name="VaccValChange" placeholder="Enter New Value/Price" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></div></form><br/><button type="submit"  class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" id="btn-VaccValChange"  form="form1" value="Submit">Change</button>'
                      );
                    } else {
                      App.contracts.asset.methods.checkSuperAdmin(accounts[0]).call(
                        {
                          from: accounts[0],
                        },
                        function (error, results){
                          if(!error){
                            if(results){
                              $(".sec2").html(
                                '<label class="form-label inline-block mb-2 text-gray-700">Accept Change of Ownership</label>&nbsp;<button type="submit"  class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" id="btn-VaccAcptChange" value="Submit">Accept</button>'
                              );
                            } else console.log("Not Super Admin");
                          } else console.error(error);
                        }
                      );
                    }
                  } else console.error(error);
                }
              );
            } else if (state == 3) {
              $("#resultVaccStatus").text("Rejected");
              $("#resultVaccFunc1 #btn-VaccApprove").attr("disabled", true);
              $("#resultVaccFunc2 #btn-VaccReject").attr("disabled", true);
              $(".sec1").html("");
              $(".sec2").html("");
              $(".sec3").html("");
            }

            $("#resultVaccValue").text(result[1]);
            $("#resultVaccOwner").text(result[2]);
          } else console.error(error);
        }
      );
    });
  },
  adduser: function (event) {
    event.preventDefault();
    var useraddress = $("#adduser #VaccAddUser").val();
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      if ($("#adduser #VaccAddUserrole").val() == "User") {
        App.contracts.asset.methods.addNewUser(useraddress).send(
          {
            from: accounts[0],
            gas: 1000000,
            gasPrice: web3.utils.toWei("20", "gwei"),
          },
          function (error, result) {
            if (!error) console.log(result);
            else console.error(error);
          }
        );
      } else if ($("#adduser #VaccAddUserrole").val() == "Admin") {
        App.contracts.asset.methods.addNewAdmin(useraddress).send(
          {
            from: accounts[0],
            gas: 1000000,
            gasPrice: web3.utils.toWei("20", "gwei"),
          },
          function (error, result) {
            if (!error) console.log(JSON.stringify(result));
            else console.error(error);
          }
        );
      } else if ($("#adduser #VaccAddUserrole").val() == "SuperAdmin") {
        App.contracts.asset.methods.addNewSuperAdmin(useraddress).send(
          {
            from: accounts[0],
            gas: 1000000,
            gasPrice: web3.utils.toWei("20", "gwei"),
          },
          function (error, result) {
            if (!error) console.log(JSON.stringify(result));
            else console.error(error);
          }
        );
      }
    });
  },
  approveUsers: function (event) {
    event.preventDefault();
    var useraddress = $("#adduser #VaccAddUser").val();
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      App.contracts.asset.methods.approveUsers(useraddress).send(
        {
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("20", "gwei"),
        },
        function (error, result) {
          if (!error) console.log(JSON.stringify(result));
          else console.error(error);
        }
      );
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
