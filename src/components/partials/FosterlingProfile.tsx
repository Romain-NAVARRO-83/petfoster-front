import { useModal } from '../../hooks/ModalContext';
import { Button } from "react-bulma-components";
import { Trash, Pencil } from "react-flaticons";
import { Tooltip } from 'react-tooltip'

function FosterlingProfile (){
    const { openModal } = useModal();
    return (
        <tr>
              <td>Chat</td>
              <td>-5ans</td>
              <td>Mâle</td>
              <td>30 Km</td>
              <td className='has-text-right'>
              
              <Button color="primary"   onClick={() => openModal('updateForsterlingProfile')} size="small" data-tooltip-id="edit-tooltip" data-tooltip-content="updateForsterlingProfile">
          < Pencil size={15} />
        </Button>
        
                <Button color="danger" size="small" data-tooltip-id="edit-tooltip" data-tooltip-content="Supprimer">
                  < Trash size={15}/>
                </Button>
                <Tooltip id="edit-tooltip" />
              </td>
            </tr>
            
    )
}
export default FosterlingProfile;