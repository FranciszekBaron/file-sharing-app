import Modal from "../Modal/Modal";
import  styles  from "..//..//components//ShareModal//ShareModal.module.css";
import { useEffect, useState } from "react";
import type { UserGetDto } from "../../types/UserGetDto";
import DropDownSearch from "../DropDownSearch/DropDownSearch";
import type { FileItem } from "../../types/FileItem";
import { useAuth } from "../../services/AuthContext";
import { Profile } from "../Common/Profile";
import { ChevronDown } from "lucide-react";
import { useFiles } from "../../services/FilesContextType";


interface Props { 
    file: FileItem,
    shareFileOpen: boolean,
    onShareFileClose: () => void
    
}

export const ModalShare = ({file,shareFileOpen,onShareFileClose} : Props) => 
{

    const { 
        currentUser
    } = useAuth()

    const { 
        handleShare,
        handleGetSharingUsers,
        handleGetUsersWithAccess
    } = useFiles()

    
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [availableUsers, setAvailableUsers] = useState<UserGetDto[]>([]);

    const [usersWithAccess, setUsersWithAccess] = useState<UserGetDto[]>([]);

    const [accessType, setAccessType] = useState<'editor'| 'viewer'> ("viewer");
    const [accessTypeOpen, setAccessTypeOpen] = useState(false);


    

    useEffect(()=> {
        const loadUsers = async () => {
            const users = await handleGetSharingUsers();
            setAvailableUsers(users);
        }
        loadUsers();
    },[])
    
    
    useEffect(()=> {
        if (!shareFileOpen) {
            return;
        }

        const loadUsersWithAccess = async () => {
            try {
                
                    const users = await handleGetUsersWithAccess(file.id);
                    setUsersWithAccess(users);
                
            } catch (err) {
                console.error('Error loading users:', err);
            }
        }
        loadUsersWithAccess();
    },[shareFileOpen])

   


    return (
        <Modal open={shareFileOpen} className={styles.modalContentShare} onClose={onShareFileClose}>
        <label className={styles.modalLabelShare}>Udostępnij plik "{file.name}"</label>
        <div className={styles.modalDropDown}>
            <DropDownSearch items={availableUsers} selectedItems={selectedUsers} onSelectionChange={setSelectedUsers}/>
        </div>
        <div className={styles.modalOwnerInfo}>
            <label className={styles.modalLabelsShare}>Osoby z dostępem</label>
                {usersWithAccess.length > 0 && (
                    <div className={styles.modalOneUserWithAccess}>
                        <Profile 
                            image={usersWithAccess.find(u => u.email === currentUser?.email)?.avatar || usersWithAccess[0].avatar} 
                            onlyInfo={true} 
                            user={usersWithAccess.find(u => u.email === currentUser?.email) || usersWithAccess[0]}
                        />
                        <div className={styles.modalOneUserInfoWrapper}>
                            <div className={styles.userInfo}>
                                <div style={{fontSize:12, fontWeight:400}}>
                                    {usersWithAccess.find(u => u.email === currentUser?.email)?.userName || usersWithAccess[0].userName}
                                </div>
                                <div style={{fontSize:12, fontWeight:200}}>
                                    {usersWithAccess.find(u => u.email === currentUser?.email)?.email || usersWithAccess[0].email}
                                </div>
                            </div>
                            <div style={{fontSize:10, fontWeight:200}}>
                                Właściciel
                            </div>
                        </div>
                    </div>
                )}
                
                {usersWithAccess.filter(u => u.email !== currentUser?.email).length > 0 && (
                    <div className={styles.modalUsersWithAccess}>
                        {usersWithAccess
                            .filter(u => u.email !== currentUser?.email) // ✅ Wyfiltruj ownera
                            .map(user => (
                                <div key={user.email}>
                                    <Profile image={user.avatar} onlyInfo={true} user={user} />
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
            <div className={styles.modalAccessType}>
            <label>Typ dostępu</label>
            
            <div className={styles.accessTypeDropdown}>
                <button className={styles.accessTypeButton} onClick={() => setAccessTypeOpen(!accessTypeOpen)}>
                    <span>{accessType === 'editor' ? 'Edytor' : 'Przeglądający'}</span>
                    <ChevronDown size={16} style={{
                        transform: accessTypeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s'
                    }} />
                </button>
                
                {accessTypeOpen && (
                    <div className={styles.accessTypeMenu}>
                        <div className={`${styles.accessTypeOption} ${accessType === 'editor' ? styles.active : ''}`}
                        onClick={() => {
                            setAccessType('editor');
                            setAccessTypeOpen(false);
                        }}>
                            <div>
                                <div className={styles.accessTypeTitle}>Edytor</div>
                                <div className={styles.accessTypeDesc}>Może edytować i udostępniać</div>
                            </div>
                        </div>
                        <div 
                            className={`${styles.accessTypeOption} ${accessType === 'viewer' ? styles.active : ''}`}
                            onClick={() => {
                                setAccessType('viewer');
                                setAccessTypeOpen(false);
                            }}
                        >
                            <div>
                                <div className={styles.accessTypeTitle}>Przeglądający</div>
                                <div className={styles.accessTypeDesc}>Może tylko przeglądać</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
            <div className={styles.modalButtonsShare}>
                <button className={styles.modalButtonShare} onClick={()=>{console.log("W momencie wykonania: " + selectedUsers);handleShare(file.id,selectedUsers,accessType);onShareFileClose(); setSelectedUsers([]);}}>
                    Gotowe
                </button>
            </div>
        </Modal>
    )
}