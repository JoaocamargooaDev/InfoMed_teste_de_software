*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}    https://www.saucedemo.com
${BROWSER}    chrome

*** Test Cases ***
CT02 Login inválido
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Input Text    id=user-name    usuario_errado
    Input Password    id=password    senha_errada
    Click Button    id=login-button
    Page Should Contain    Epic sadface
    Sleep    2s
    Close Browser