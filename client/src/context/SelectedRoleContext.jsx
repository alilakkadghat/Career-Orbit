import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

const SelectedRoleContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedRole = () =>
    useContext(SelectedRoleContext);

export const SelectedRoleProvider = ({
    children
}) => {
    const [selectedRole, setSelectedRole] =
        useState(() => {
            const saved = localStorage.getItem(
                'selected_role'
            );

            return saved
                ? JSON.parse(saved)
                : null;
        });

    useEffect(() => {
        if (selectedRole) {
            localStorage.setItem(
                'selected_role',
                JSON.stringify(selectedRole)
            );
        }
    }, [selectedRole]);

    const clearSelectedRole = () => {
        setSelectedRole(null);
        localStorage.removeItem(
            'selected_role'
        );
    };

    return (
        <SelectedRoleContext.Provider
            value={{
                selectedRole,
                setSelectedRole,
                clearSelectedRole
            }}
        >
            {children}
        </SelectedRoleContext.Provider>
    );
};

export default SelectedRoleContext;