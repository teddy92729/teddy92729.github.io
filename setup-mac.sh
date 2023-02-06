#!/bin/bash
# sudo ip link set dev eth0 down
# sudo ip link set dev eth0 address 50:eb:f6:54:ed:13
# sudo ip link set dev eth0 up
# sleep 5s

setup_network() {
    ping -q -c3 8.8.8.8 > /dev/null
    if [ $? -ne 0 ]; then
        sudo ip link set dev eth0 down
        sudo ip link set dev eth0 address 50:eb:f6:54:ed:13
        sudo ip link set dev eth0 up
        sleep 10s
    fi
}
setup_network