// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/utils/Context.sol";

contract SignatureUtility is Context {
    struct Sign {
        bytes signature;
        uint eat;
        uint nonce;
    }

    mapping(uint => bool) internal _usedNonce;
    address private _signer;
    /**
     * @dev Modifier to only allow an authorized signer to perform minting.
     * @dev This Signer may be different from the Owner.
     * @param sig The signature provided by the signer for authorization.
     */

    modifier onlyVerifiedUser(Sign calldata sig) {
        require(sig.eat > block.timestamp, "Signature Already Expired");
        bytes32 messageHash = getMessageHash(_msgSender(), sig.eat, sig.nonce);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        require(
            recoverSigner(ethSignedMessageHash, sig.signature) == _signer,
            "Unauthorised Signer"
        );
        require(!_usedNonce[sig.nonce], "Invalid Signature");
        _;
    }

    /**
     * @dev Sets the Signer address.
     */
    constructor() {
        _signer = _msgSender();
    }

    /**
     * @dev Recovers the address of the signer given an Ethereum signed message hash and a signature.
     * @param _ethSignedMessageHash The hash of the signed message.
     * @param _signature The signature provided by the signer.
     * @return The address of the signer.
     */
    function recoverSigner(
        bytes32 _ethSignedMessageHash,
        bytes memory _signature
    ) internal pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    /**
     * @dev Splits a signature into its r, s, and v components.
     * @param sig The signature to split.
     * @return r component of the signature.
     * @return s component of the signature.
     * @return v component of the signature.
     */
    function splitSignature(
        bytes memory sig
    ) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }

    /**
     * @dev Computes the hash of a message.
     * @param eat Expiring At Timestamp.
     * @return The hash of the message.
     */
    function getMessageHash(
        address addr,
        uint eat,
        uint nonce
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(addr, eat, nonce));
    }

    /**
     * @dev Computes the Ethereum signed message hash for a given message hash.
     * @param _messageHash The message hash to sign.
     * @return The Ethereum signed message hash.
     */
    function getEthSignedMessageHash(
        bytes32 _messageHash
    ) internal pure returns (bytes32) {
        /*
        Signature is produced by signing a keccak256 hash with the following format:
        "\x19Ethereum Signed Message\n" + len(msg) + msg
        */
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    _messageHash
                )
            );
    }

    /**
     * @dev Internal function allows for changing of signer.
     * @param _newSigner Address of the New Signer
     */
    function _setSigner(address _newSigner) internal virtual {
        _signer = _newSigner;
    }

    /**
     * @dev Getter for Signer. Fashioned after Openzeppelin's owner() method of Ownable contract.
     */
    function signer() internal view returns (address) {
        return _signer;
    }
}
